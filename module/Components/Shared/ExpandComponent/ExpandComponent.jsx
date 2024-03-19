import React, { useState } from "react";

export default function ExpandComponent({ data, list, objectName }) {
  console.log("sasasda",data,objectName);
  const [clicked, setClicked] = useState(false);

  let stores = data?.filter((d)=>{
if(d.store_name){
  return d
}

  })
  console.log("sasasasasasasasa",stores?.length);
  if (list) {
    return (
      <div>
        {data?.map((d, i) => {
          if (i < 2) {
            return (
              <li className="list-unstyled" key={i}>
                {d?.[objectName] ?? ""}
              </li>
            );
          } else if (clicked) {
            return (
              <li className="list-unstyled" key={i}>
                {d?.[objectName] ?? ""}
              </li>
            );
          }
        })}
        {stores?.length > 2 && !clicked ? (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setClicked(true);
            }}
            style={{ color: "rgb(32, 33, 73)" }}
          >
            + {stores?.length - 2} More
          </div>
        ) : (
          clicked === true && (
            <div
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setClicked(false);
              }}
              style={{ color: "rgb(32, 33, 73)" }}
            >
              Show Less
            </div>
          )
        )}
      </div>
    );
  }
}
