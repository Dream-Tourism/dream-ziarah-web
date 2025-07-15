import Hajj from "@/components/hajj";
import HajjHeading from "@/components/hajj/HajjHeading";
import Wrapper from "@/components/layout/Wrapper";

export const metadata = {
  title: "Hajj Packages | Complete Your Hajj Pilgrimage with Dream Ziarah",
  description:
    "Achieve a profound spiritual journey with Dream Ziarah's Hajj packages. We offer full support for your pilgrim, ensuring a deeply enriching and smooth experience.",
};

export default function HajjPage() {
  return (
    <>
      <Wrapper>
        <Hajj>
          <HajjHeading />
        </Hajj>
      </Wrapper>
    </>
  );
}
