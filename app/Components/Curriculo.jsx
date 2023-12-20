"use client";
import React from "react";
import { Modal, Timeline, TimelineItem } from ".";

const Curriculo = ({ profissional }) => {
  return (
    <Modal
      buttonText={"Ver Currículo"}
      title={"Currículo"}
      className={"w-full lg:w-1/3 !text-sm mt-auto"}
    >
      <Timeline>
        {profissional.curriculo &&
          profissional.curriculo.map((item, index) => (
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
