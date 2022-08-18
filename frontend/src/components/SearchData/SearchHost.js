
import { Icon } from "@mui/material";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getEvents } from "../../modules/Event/method/Method";
import { H4, H5, H6 } from "../Text/Text";
import { Flex } from "../UI/Flex/Flex";
import { getQueries } from "../../modules/Queries/MethodQuery/MethodQueries";
import { getAllPeople } from "../../modules/People/Method_people";
import './SearchUser.css'
export const SearchHost = ({ searchTerm, searchResult,hide,setHide,clearSearch }) => {
  const { data: findpeople } = useQuery("findpeople", getAllPeople);
  

  console.log("findpeople", findpeople);

  return (
    <div>
      {hide?
      <Row>
        <div style={searchResult} className="searchUserResult"  onClick={() => clearSearch(false)}>
          {findpeople?.data
            ?.filter((ev) => {
              if (searchTerm === "") {
                return <h2>val</h2>;
              } else if (
                // hosting_check
                ev.username
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ev.born_location
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                  ev.hosting_check==="Maybe Accepting Guests"
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) 
              ) {
                return <h2>val</h2>;
              }
            })
            .map((data, key) => (
              <Flex margin="10px" justifyContent="center" alignItems="center">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                  }}
                  src={require("../../assets/profile_pic/johnson-martin-zpq2DMidOY0-unsplash.jpg")}
                  alt=""
                />
                <Link
                  to={`/peopledetail/${data.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Flex flexDirection="column">
                    <H5
                      onClick={() => setHide(false)}
                      margin="0 5px"
                      color="black"
                      fontWeight="bold"
                    >
                      {data?.username}
                    </H5>
                  </Flex>
                </Link>
              </Flex>
            ))}
        </div>
      </Row>: null
      }
    </div>

  );
};
