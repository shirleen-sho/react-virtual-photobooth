import Button from "../../components/Button";

function Home() {
  return (
    <div className="flex flex-col items-center gap-5">
      <span>Welcome !</span>
      <Button linkToPage="/photobooth" variant="primary">
        Start
      </Button>
    </div>
  );
}

export default Home;
