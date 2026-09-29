import Button from "../../components/Button";

function Home() {
  return (
    <div className="py-32 flex flex-col md:items-center gap-12">
      <div className="flex flex-col md:items-center gap-4">
        <span className="font-bold text-5xl tracking-wide text-primary-600">
          Virtual Photobooth
        </span>
        <span className="italic text-base tracking-normal text-primary-400">
          Capture your moments with your webcam and turn them into a photostrip
          !
        </span>
      </div>
      <Button
        linkToPage="/photobooth"
        variant="primary"
        additionalStyle={{ "letter-spacing": "1px", "min-width": "33%" }}
      >
        START
      </Button>
    </div>
  );
}

export default Home;
