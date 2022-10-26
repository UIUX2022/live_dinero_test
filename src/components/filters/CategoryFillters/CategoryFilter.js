import './CategoryFilter.scss';
const CategoryFilter = () => {
    const data = [
      {
        name: "Property for sale (102010)",
        child: ["Lands & Plots  (100)", "Houses (1020)", "Apartments & Flats (200)", "Shops - Offices (100)", "Commercial Space (50)", "Portions (50)","Floors (50)" ],
      },
      {
        name: "Property for rent (1500)",
        child: ["Lands & Plots  (100)", "Houses (1020)", "Apartments & Flats (200)", "Shops - Offices (100)", "Commercial Space (50)", "Portions (50)","Floors (50)" ],
      },
      {
        name: "Property for sale (102010)",
        child: ["Lands & Plots  (100)", "Houses (1020)", "Apartments & Flats (200)", "Shops - Offices (100)", "Commercial Space (50)", "Portions (50)","Floors (50)" ],
      },
      {
        name: "Property for rent (1500)",
        child: ["Lands & Plots  (100)", "Houses (1020)", "Apartments & Flats (200)", "Shops - Offices (100)", "Commercial Space (50)", "Portions (50)","Floors (50)" ],
      },
    
    ];
    return (
      <>
        <div className="category_filter">
          <div className="display_cat">
            {data.map((data1, index) => {
              return (
                <div className="px-1" key={index}>
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
  export default CategoryFilter;
  