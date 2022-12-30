import Link from "next/link";

const NavigationBar = ({ itemList, label }) => {
  return (
    <div className="sidebar">
      <p className="title-db">{label ? label : "FACULTY"}</p>
      {itemList.map(({ name, link, icon }, index) => (
        <Link href={link} key={name} style={{ textDecoration: "none" }}>
          <div className="menu-item">
            <div className="menu">
              <i className={icon} style={{ marginBottom: "14px" }}></i>
              <p>{name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
