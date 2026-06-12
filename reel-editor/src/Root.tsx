import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { AppraisalReel } from "./AppraisalReel";
import { EkaboReel } from "./EkaboReel";
import { FPS, TOTAL_SECONDS } from "./reel-data";
import { FPS as EKABO_FPS, TOTAL_SECONDS as EKABO_SECONDS } from "./ekabo-data";

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
        id="EkaboReel"
        component={EkaboReel}
        durationInFrames={Math.round(EKABO_SECONDS * EKABO_FPS)}
        fps={EKABO_FPS}
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
