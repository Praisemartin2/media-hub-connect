import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { AppraisalReel } from "./AppraisalReel";
import { FPS, TOTAL_SECONDS } from "./reel-data";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AppraisalReel"
        component={AppraisalReel}
        durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
