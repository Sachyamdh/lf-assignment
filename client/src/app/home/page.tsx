import Hero from "@/src/components/organisms/hero/HeroSection";
import { BackgroundWrapper } from "@/src/components/organisms/wrapper/BackgoroundWrapper";

export default function Home() {
  return (
    <main className="bg-background-primary flex justify-center items-center  min-h-[100vh]">
      <BackgroundWrapper>
        <Hero />
      </BackgroundWrapper>
    </main>
  );
}
