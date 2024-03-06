import Template from "@/components/Template";
import ImageCard from "@/components/ImageCard";

const Home = () => {
  return (
    <Template>
      <section className="grid grid-cols-4 gap-8">
        <ImageCard/>
        <ImageCard/>
        <ImageCard/>
      </section>
    </Template>
  );
}

export default Home;