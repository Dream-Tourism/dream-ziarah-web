const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Customer Care",
      action: "tel:+(966) 54 803 7409",
      text: "+966 54 803 7409",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:sales@dreamziarah.com",
      text: "sales@dreamziarah.com",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mb-20" key={item.id}>
          <div className={"text-14"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-600 text-dark-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
