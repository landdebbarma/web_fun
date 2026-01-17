// ./hooks/useFlowdata.ts
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

  const updateFlowFromAI = (result: AIResult) => {
    console.log("🎨 Updating flow with result:", result);

    // Try to use component_tree if available
    if (
      result.component_tree?.folders &&
      result.component_tree.folders.length > 0
    ) {
      createTreeFromFolders(result.component_tree.folders);
    }
    // Fallback to tech_stack if no component tree
    else if (result.tech_stack && result.tech_stack.length > 0) {
      createTechStackFlow(result.tech_stack);
    }
  };

  const createTreeFromFolders = (folders: string[]) => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Ensure all parent paths exist
    const allFolders = new Set<string>();
    folders.forEach((folder) => {
      allFolders.add(folder);

      // Add all parent paths
      const parts = folder.split("/");
      for (let i = 1; i < parts.length; i++) {
        const parentPath = parts.slice(0, i).join("/");
        if (parentPath) {
          allFolders.add(parentPath);
        }
      }
    });

    const folderArray = Array.from(allFolders).sort();

    // Group folders by depth
    const foldersByDepth: { [key: number]: string[] } = {};

    folderArray.forEach((folder) => {
      const depth = folder.split("/").length - 1;
      if (!foldersByDepth[depth]) {
        foldersByDepth[depth] = [];
      }
      foldersByDepth[depth].push(folder);
    });

    const verticalSpacing = 200; // Increased for vertical level separation
    const horizontalSpacing = 350; // Width for nodes side-by-side

    let nodeId = 0;
    const folderToNodeId: { [key: string]: string } = {};

    // Create nodes for each depth level
    Object.keys(foldersByDepth)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((depthStr) => {
        const depth = Number(depthStr);
        const foldersAtDepth = foldersByDepth[depth];

        foldersAtDepth.forEach((folder, indexAtDepth) => {
          const id = `node-${nodeId++}`;
          const label = folder.split("/").pop() || folder;

          // Calculate position for Top-to-Bottom flow:
          // x is determined by indexAtDepth (siblings spread horizontally)
          // y is determined by depth (levels go down)
          const x = indexAtDepth * horizontalSpacing + 80;
          const y = depth * verticalSpacing + 80;

          newNodes.push({
            id,
            position: { x, y },
            data: {
              label,
              fullPath: folder,
            },
            type: "infoNode",
          });

          folderToNodeId[folder] = id;
        });
      });

    // Create edges AFTER all nodes are created
    folderArray.forEach((folder) => {
      const depth = folder.split("/").length - 1;

      if (depth > 0) {
        const parentPath = folder.substring(0, folder.lastIndexOf("/"));
        const parentId = folderToNodeId[parentPath];
        const childId = folderToNodeId[folder];

        if (parentId && childId) {
          newEdges.push({
            id: `edge-${childId}`,
            source: parentId,
            target: childId,
            type: "default", // Bezier curve for smoother connections
            animated: true,
            style: {
              stroke: "#a855f7", // Keep the purple brand color
              strokeWidth: 2,
              strokeDasharray: "5, 5", // Dashed pattern matching the image
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 20,
              height: 20,
              color: "#a855f7",
            },
          });
        }
      }
    });

    console.log(
      "📊 Created hierarchy - Nodes:",
      newNodes.length,
      "Edges:",
      newEdges.length
    );
    setNodes(newNodes);
    setEdges(newEdges);
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
      animated: true,
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return { nodes, edges, onNodesChange, onEdgesChange, updateFlowFromAI };
}
