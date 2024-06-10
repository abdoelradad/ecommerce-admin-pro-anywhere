import { BeatLoader } from "react-spinners";

export default function Spinner() {
  return (
    <>
      <BeatLoader
        color="#FF2E63"
        size={10}
        className="origin-center rotate-90"
      />
    </>
  );
}
