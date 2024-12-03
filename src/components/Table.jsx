import React, { useEffect, useState } from "react";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { useLoaderData } from "react-router-dom";

const Table = () => {
  const data = useLoaderData();
  const [tableData, setTableData] = useState(data);
  const [search, setSearch] = useState("");
  const { isComplete } = tableData;

  useEffect(() => {
    fetch(`http://localhost:5000/findschedules?searchParams=${search}`)
      .then((res) => res.json())
     .then((data) => setTableData(data));
}, [search])
  
  const handelStatus = (id) => {
    fetch(`http://localhost:5000/status/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <div className="w-[400px] mx-auto mb-4">
        <input
          onKeyUp={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="w-1/2 mx-auto bg-slate-50">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>serial</th>
                <th>Title</th>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Auction</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((data, index) => (
                  <tr key={data._id}>
                    <th>{index + 1}</th>
                    <th>{data.title}</th>
                    <th>{data.day}</th>
                    <th>{data.formattedDate}</th>
                    <th>{data.formatHour}</th>
                    <th onClick={() => handelStatus(data._id)}>
                      {isComplete ? <MdOutlineDoneAll /> : <MdDone />}
                    </th>
                  </tr>
                ))
              ) : (
                <p>no data available</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
