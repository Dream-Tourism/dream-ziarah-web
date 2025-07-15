import dynamic from "next/dynamic";

const MainHome = dynamic(() => import("@/components/home/MainHome"));
const Wrapper = dynamic(() => import("@/components/layout/Wrapper"));

export const metadata = {
  title:
    "Dream Ziarah - Luxury Ziyarat Tours in Makkah & Madina | Umrah and Hajj Packages",
  description:
    "Dream Ziarah specializes in providing spiritual journeys with exclusive Ziyarat tours in Makkah & Madina, alongside comprehensive Umrah and Hajj packages. Explore sacred sites with us and embark on a journey of faith and discovery.",
};

export default function Home() {
  return (
    <>
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
