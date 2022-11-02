import "./locationFilter.scss";
const LocationsFilter = () => {
  const data = [
    {
      name: "Qatar (1020)",
      child: [
        "Ad-Dawhah   (100)",
        "Al Rayyan(1020)",
        "Al Daayen (100)",
        "Umm Salal  (50)",
        "Al Khor (50)",
        "Portions (50)",
        "Floors (50)",
      ],
      },
  ];
  return (
    <>
      <div className="category_filter">
        <div className="display_cat">
          {data.map((data1, index) => {
            return (
              <div className="px-1" key={data1 + index}>
                <h6 className="px-1">{data1.name}</h6>
                {data1.child.map((data2) => {
                  return (
                    <>
                      <p className="px-3">{data2}</p>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default LocationsFilter;
