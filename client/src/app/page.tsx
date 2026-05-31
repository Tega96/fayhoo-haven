import Navbar from "@/components/Navbar";
import Landing from "./(nodashboard)/landing/page";

const Home = () => {
  return (

    <div className="">
      <Navbar />
      <main className="h-full flex w-full flex-col">
        <Landing />
      </main>
    </div>
  );
}
export default Home;