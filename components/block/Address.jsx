const Address = ({ saudi }) => {
  const addressContent = [
    {
      id: 1,
      colClass: "col-lg-3",
      title: "Address:",
      content: (
        <>
          3893 Ibrahim Al Khalil, Ash Shubaikah 6428, Mecca 24231, Saudi Arabia.
        </>
      ),
    },
    {
      id: 2,
      colClass: "col-auto",
      title: "Customer Care",
      content: (
        <>
          <a href="tel:+966 54 803 7409">+966 54 803 7409</a>
        </>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Need live support?",
      content: (
        <>
          {" "}
          <a href="mailto:sales@dreamziarah.com">sales@dreamziarah.com</a>
        </>
      ),
    },
  ];

  const addressContent2 = [
    {
      id: 1,
      colClass: "col-lg-3",
      title: "Italy Address",
      content: <>Via Principe Eugenio, 95, 00185 Roma RM, Italy.</>,
    },
    {
      id: 2,
      colClass: "col-auto",
      title: "Customer Care",
      content: (
        <>
          <a href="tel:+39 388 774 8015">+39 388 774 8015</a>
        </>
      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Need live support?",
      content: (
        <>
          {" "}
          <a href="sales@dreamziarah.com">sales@dreamziarah.com</a>
        </>
      ),
    },
  ];

  const newAddressContent = saudi ? addressContent : addressContent2;

  return (
    <>
      {newAddressContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <div className="text-14 text-light-1">{item.title}</div>
          <div className="text-18 fw-600 mt-10">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export default Address;
