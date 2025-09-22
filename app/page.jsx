import dynamic from "next/dynamic";
import Wrapper from "@/components/layout/Wrapper";

const MainHome = dynamic(() => import("@/components/home/MainHome"));

export const metadata = {
  title:
    "Dream Ziarah - Luxury Ziyarat Tours in Makkah & Madina | Umrah and Hajj Packages",
  description:
    "Dream Ziarah specializes in providing spiritual journeys with exclusive Ziyarat tours in Makkah & Madina, alongside comprehensive Umrah and Hajj packages. Explore sacred sites with us and embark on a journey of faith and discovery.",
};

// Cache for 5 minutes to improve performance
export const revalidate = 300;

export default function Home() {
  return (
    <Wrapper>
      <MainHome />
    </Wrapper>
  );
}
