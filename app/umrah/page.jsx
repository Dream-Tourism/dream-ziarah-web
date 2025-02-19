import Wrapper from "@/components/layout/Wrapper";
import Umrah from "@/components/umrah";
import UmrahHeading from "@/components/umrah/UmrahHeading";

export const metadata = {
  title: "Umrah Packages | Spiritual Umrah Journeys with Dream Ziarah",
  description:
    "Experience spiritual renewal and tranquility with Dream Ziarah’s Umrah packages. Our carefully curated services provide a meaningful pilgrimage, designed for your peace and spiritual deepening.",
};

export default function UmrahPage() {
  return (
    <>
      <Wrapper>
        <Umrah>
          <UmrahHeading />
        </Umrah>
      </Wrapper>
    </>
  );
}
