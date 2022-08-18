import React from 'react'
import { Col, Row } from "react-bootstrap";
import { Card } from "../components/Card/Card";
import { Icon } from './Icon/Icon';
import { Flex } from './UI/Flex/Flex';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { H4, H5, H6 } from './Text/Text';
import "../modules/Event/AllEvent.css";

export const CardSkelton = ({cards}) => {

  const arr1=[1,2,3,4,5,6,7,8,9]
  return (
    <div className="event">
        <Row>
          {arr1.map((data)=>(
          <Col lg={4}>
            <Card style={{borderRadius: "200px"}}>
            
                {/* <img
                  style={{ borderRadius: "20px", width: "100%" }}
                  src={<Skeleton width={100}/>}
                  alt=""
                /> */}
                <Skeleton width="100%" height="300px"/>

                <H4 fontWeight="bolder" margin="5px">
                  {<Skeleton width={100}/>}
                </H4>
                <H5 fontWeight="bolder" color="green" margin="5px">
                  {<Skeleton width={100}/>}
                </H5>
              <H6 fontWeight="bold" color="red" margin="5px">
                {<Skeleton width={100}/>} 
              </H6>
              <Flex marginLeft="10px">
                  <Skeleton circle width={40} height={40}/>
                  <Skeleton circle width={40} height={40}/>
                  <Skeleton circle width={40} height={40}/>

                
              </Flex>
            </Card>
          </Col>  
          ))}
                
      </Row>
      </div>
      )

}
