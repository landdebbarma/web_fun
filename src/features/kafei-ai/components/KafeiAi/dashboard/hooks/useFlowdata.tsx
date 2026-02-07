import { useEffect, useState, useRef, useCallback } from "react";
import type { Node, Edge } from "reactflow";
import { MarkerType, useNodesState, useEdgesState } from "reactflow";

type ComponentTree = {
  folders?: string[];
  files?: string[];
};

export type AIResult = {
  system_design?: string;
  component_tree?: ComponentTree;
  architecture?: string;
  diagram?: string;
  structure?: string[];
  deployment?: string;
  risks?: string;
  tech_stack?: string[];
};

export function useFlowData() {
  // Use React Flow's state management hooks for draggable nodes
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // State for interactive expansion
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const allFoldersRef = useRef<string[]>([]);

  // HMR/State Fix: Ensure edges are solid and gray even if they were created with old code
  useEffect(() => {
    setEdges((eds) =>
      eds.map((e) => {
        // If edge has dash array (dotted) or is animated or is purple, fix it
        if (
          e.animated ||
          e.style?.strokeDasharray ||
          e.style?.stroke === "#a855f7"
        ) {
          return {
            ...e,
            type: "default",
            animated: false,
            style: {
              ...e.style,
              stroke: "#94a3b8",
              strokeWidth: 2,
              strokeDasharray: undefined,
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#94a3b8",
            },
          };
        }
        return e;
      }),
    );
  }, [setEdges]);

  // Toggle expansion of a folder
  const toggleFolder = useCallback((folderPath: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  }, []);

  // Helper to remove trailing slashes and normalize
  const normalizePath = (path: string) => {
    return path.replace(/\/+$/, "");
  };

  const createTreeFromFolders = useCallback(
    (rawFolders: string[]) => {
      // 1. Normalize all paths
      const folders = Array.from(new Set(rawFolders.map(normalizePath))).sort();

      // 2. Build Tree Structure
      type TreeNode = {
        id: string; // full path
        name: string; // segment name
        children: TreeNode[];
        isOpen: boolean;
        // Layout properties
        width: number;
        x: number;
        y: number;
      };

      const rootNodes: TreeNode[] = [];
      const nodeMap = new Map<string, TreeNode>();

      // Initialize all nodes
      folders.forEach((path) => {
        const parts = path.split("/");
        const name = parts[parts.length - 1];
        const node: TreeNode = {
          id: path,
          name,
          children: [],
          isOpen: expandedPaths.has(path),
          width: 0,
          x: 0,
          y: 0,
        };
        nodeMap.set(path, node);
      });

      // Build hierarchy
      folders.forEach((path) => {
        const parts = path.split("/");
        const node = nodeMap.get(path)!;

        if (parts.length === 1) {
          rootNodes.push(node);
        } else {
          // Find parent
          const parentPath = parts.slice(0, parts.length - 1).join("/");
          const parent = nodeMap.get(parentPath);
          if (parent) {
            parent.children.push(node);
          } else {
            rootNodes.push(node);
          }
        }
      });

      // 3. Layout Algorithm
      const NODE_WIDTH = 180;
      const X_GAP = 50;
      const Y_GAP = 120;

      // Calculate subtree widths (Post-order)
      const calculateWidths = (node: TreeNode): number => {
        if (!node.isOpen || node.children.length === 0) {
          node.width = NODE_WIDTH;
          return NODE_WIDTH;
        }

        let childrenWidth = 0;
        node.children.forEach((child, index) => {
          childrenWidth += calculateWidths(child);
          if (index < node.children.length - 1) childrenWidth += X_GAP;
        });

        node.width = Math.max(NODE_WIDTH, childrenWidth);
        return node.width;
      };

      // Assign coordinates (Pre-order)
      const assignCoordinates = (node: TreeNode, x: number, y: number) => {
        node.x = x;
        node.y = y;

        if (node.isOpen && node.children.length > 0) {
          // Calculate total width of children group
          let childrenTotalWidth = 0;
          node.children.forEach((child, i) => {
            childrenTotalWidth += child.width;
            if (i < node.children.length - 1) childrenTotalWidth += X_GAP;
          });

          // Start position for the first child
          let childStartX = x - childrenTotalWidth / 2;

          node.children.forEach((child) => {
            const childCenter = childStartX + child.width / 2;
            assignCoordinates(child, childCenter, y + Y_GAP);
            childStartX += child.width + X_GAP;
          });
        }
      };

      // Run Layout
      rootNodes.forEach((root) => {
        calculateWidths(root);
      });

      let currentRootX = 0;

      rootNodes.forEach((root) => {
        const rootCenter = currentRootX + root.width / 2;
        assignCoordinates(root, rootCenter, 50);
        currentRootX += root.width + X_GAP;
      });

      // 4. Generate React Flow Nodes & Edges
      const newNodes: Node[] = [];
      const newEdges: Edge[] = [];

      const traverseAndCreate = (node: TreeNode) => {
        // Create Node
        const hasChildren = node.children.length > 0;
        newNodes.push({
          id: node.id,
          position: { x: node.x, y: node.y },
          data: {
            label: node.name,
            fullPath: node.id, // Normalized path
            description: hasChildren
              ? node.isOpen
                ? "Collapse Folder"
                : "Expand Folder"
              : "File / Component",
            role: hasChildren ? "Folder" : "File",
          },
          type: "infoNode",
        });

        // Create Edges to children (only if open)
        if (node.isOpen) {
          node.children.forEach((child) => {
            newEdges.push({
              id: `e-${node.id}-${child.id}`,
              source: node.id,
              target: child.id,
              type: "smoothstep", // detailed orthogonal lines
              style: { stroke: "#94a3b8", strokeWidth: 2 },
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            });
            traverseAndCreate(child);
          });
        }
      };

      rootNodes.forEach((root) => traverseAndCreate(root));

      setNodes(newNodes);
      setEdges(newEdges);
    },
    [expandedPaths, setNodes, setEdges],
  );

  // Re-generate tree whenever expanded paths change or base data changes
  useEffect(() => {
    if (allFoldersRef.current.length > 0) {
      createTreeFromFolders(allFoldersRef.current);
    }
  }, [expandedPaths, createTreeFromFolders]);

  const updateFlowFromAI = (result: AIResult) => {
    // console.log("🎨 Updating flow with result:", result);

    // Try to use component_tree if available
    if (
      result.component_tree?.folders &&
      result.component_tree.folders.length > 0
    ) {
      allFoldersRef.current = result.component_tree.folders;
      // Initialize with root folders expanded if you want, or start collapsed
      // For now, let's start with empty set (collapsed) or maybe just root?
      // createTreeFromFolders will handle initial render based on allFoldersRef
      createTreeFromFolders(result.component_tree.folders);
    }
    // Fallback to tech_stack if no component tree
    else if (result.tech_stack && result.tech_stack.length > 0) {
      createTechStackFlow(result.tech_stack);
    }
  };

  const createTechStackFlow = (tech_stack: string[]) => {
    const newNodes: Node[] = tech_stack.map((tech, index) => ({
      id: `tech-${index}`,
      position: { x: 250, y: 100 + index * 150 },
      data: { label: tech },
      type: "infoNode",
    }));

    const newEdges: Edge[] = tech_stack.slice(0, -1).map((_, index) => ({
      id: `e-${index}`,
      source: `tech-${index}`,
      target: `tech-${index + 1}`,
      type: "default",
      animated: false,
      style: { stroke: "#94a3b8", strokeWidth: 2 },
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    updateFlowFromAI,
    toggleFolder,
  };
}
