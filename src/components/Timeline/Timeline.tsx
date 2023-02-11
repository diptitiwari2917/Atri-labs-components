import React from "react";
import "./styles.css";

export interface TimeInterface {
  eventTime: string;
}

export interface StatusCircleInterface {
  eventStatus: EventStatusEnum;
  customStatusIcon?: string;
}

export interface DescriptionInterface {
  eventDescription?: string;
  eventTitle?: string;
}

export enum TimelineVariantEnum {
  SOLID = "solid",
  OUTLINED = "outlined"
}

export enum EventStatusEnum {
  CUSTOM= "custom",
  SUCCESS= "success",
  DANGER= "danger",
  INFORMATIVE= "informative",
  DEFAULT= "default"
}

export interface EventInterface {
  time?: string;
  status?: EventStatusEnum;
  description?: string;
  title?: string;
  customStatusIcon?: string;
}

export interface TimelineInterface {
  events: Array<EventInterface>;
  alternate?: boolean;
  variant?: TimelineVariantEnum;
}

const Time: React.FC<TimeInterface> = ({ eventTime }) => {
  return <div className="time">{eventTime}</div>;
};

const StatusCircle: React.FC<StatusCircleInterface> = ({
  eventStatus,
  customStatusIcon,
}) => {
  return (
    <>
      {eventStatus === EventStatusEnum.CUSTOM ? (
        <img src={customStatusIcon} alt="custom" />
      ) : (
        <div className="marker" />
      )}
    </>
  );
};

const Description: React.FC<DescriptionInterface> = ({
  eventDescription,
  eventTitle,
}) => {
  return (
    <div className="timeline-content">
      <h4 className="title"> {eventTitle}</h4>
      <p>
        {eventDescription?.split(",").map((element) => {
          return <p key={element}>{element}</p>;
        })}
      </p>
    </div>
  );
};

const Timeline: React.FC<TimelineInterface> = ({
  events,
  alternate,
  variant,
}) => {
  return (
    <div
      className={`
        ${variant === TimelineVariantEnum.OUTLINED && "timeline-container "} +
        ${variant === TimelineVariantEnum.SOLID && "timeline-container solid"}
      `}
    >
      {events.map((event, index) => (
        <div
          key={index}
          className={`timeline-block ${
            (alternate && index % 2 === 0) || !alternate
              ? "timeline-block-right "
              : "timeline-block-left"
          } ${event.status}`}
        >
          {event?.time && <Time eventTime={event?.time} />}
          <StatusCircle
            eventStatus={event.status || EventStatusEnum.DEFAULT}
            customStatusIcon={event?.customStatusIcon}
          />
          <Description
            eventDescription={event?.description}
            eventTitle={event?.title}
          />
        </div>
      ))}
    </div>
  );
};

Timeline.defaultProps = {
  events: [],
  variant: TimelineVariantEnum.OUTLINED,
  alternate: false
}

export default Timeline;
