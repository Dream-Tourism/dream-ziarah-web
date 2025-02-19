const Counter = () => {
  const blockContent = [
    {
      id: 1,
      number: "5",
      meta: "Destinations",
      hasUnit: "",
      delayAnim: "100",
    },
    {
      id: 3,
      number: "100",
      meta: "Happy customers",
      hasUnit: "K+",
      delayAnim: "300",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-xl-3 col-6"
          key={item.id}
          data-aos="fade"
          data-aos-delay={item.delayAnim}
        >
          <div className="text-40 lg:text-30 lh-13 fw-600">
            {item.number}
            {item.hasUnit}
          </div>
          <div className="text-14 lh-14 text-light-1 mt-5">{item.meta}</div>
        </div>
      ))}
    </>
  );
};

export default Counter;
