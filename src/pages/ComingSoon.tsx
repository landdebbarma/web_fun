import { useNavigate } from "react-router-dom";
import Hero from "@/components/ui/animated-shader-hero";

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <Hero
      trustBadge={{
        text: "Building Something Extraordinary",
        icons: ["✨", ""],
      }}
      headline={{
        line1: "COMING",
        line2: "SOON",
      }}
      subtitle="We're crafting an experience that defies expectations. AntoAnt is preparing for liftoff."
      buttons={{
        primary: {
          text: "Return Home",
          onClick: () => navigate("/"),
        },
        secondary: {
          text: "Go Back",
          onClick: () => navigate(-1),
        },
      }}
    />
  );
};

export default ComingSoon;
