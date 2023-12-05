"use client";
import React from "react";
import { Modal, Timeline, TimelineItem } from ".";

const Curriculo = ({ profissional }) => {
  return (
    <Modal buttonText={"Ver Currículo"} title={"Currículo"}>
      <Timeline>
        {profissional.curriculo.map((item, index) => (
          <TimelineItem
            key={index}
            title={item.title}
            text={item.text}
            date={item.date}
          >
            {item.description}
          </TimelineItem>
        ))}
      </Timeline>
    </Modal>
  );
};

export default Curriculo;
