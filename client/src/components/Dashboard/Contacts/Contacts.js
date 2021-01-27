import React from "react";
import ActionButton from "../../ActionButton";
import Select from "../../Select";
import Table from "../../Table";
import lisa from "./lisa.svg";

const Contacts = () => {
  const data = [
    {
      photo: lisa,
      name: "Lindsey Stroud",
      email: "lindsey.stroud@gmail.com",
      companyName: "Hatchbuck",
      role: "Manager",
      forecast: 50,
      recentActivity: 5,
    },
    {
      photo: lisa,
      name: "Arcadia Jillas",
      email: "rebecca.moore@gmail.com",
      companyName: "Google",
      role: "CEO",
      forecast: 75,
      recentActivity: 10,
    },
    {
      photo: lisa,
      name: "Endsey Wjsja",
      email: "iolilsda.stroud@gmail.com",
      companyName: "Trello",
      role: "Engineer",
      forecast: 30,
      recentActivity: 25,
    },
  ];
  return (
    <div className="contacts">
      <div className="contacts__head">
        <Select>Company</Select>
        <ActionButton>Add contact</ActionButton>
      </div>
      <div className="contacts__table">
        <Table data={data} />
      </div>
    </div>
  );
};
export default Contacts;
