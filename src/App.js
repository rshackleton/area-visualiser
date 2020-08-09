import { Flex, Input, ThemeProvider, UIModeProvider } from "chakra-ui";
import { motion } from "framer-motion";
import React, { useState } from "react";

import "./styles.css";

// Transition settings.
const DAMPING = 25;
const RESTDELTA = 0.5;
const RESTSPEED = 10;
const STIFFNESS = 500;

export default function App() {
  const [height, setHeight] = useState(2);
  const [width, setWidth] = useState(5);

  const maxSize = 140;
  const offset = 10;
  const svgHeight = 226;
  const svgWidth = 252;

  return (
    <ThemeProvider>
      <UIModeProvider>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Flex alignItems="center" justifyContent="center" mb={2}>
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="300">
              <Grass />
              <ArrowHeight
                centreX={svgWidth / 2}
                centreY={svgHeight / 2}
                maxSize={maxSize}
                offset={offset}
                height={height}
                width={width}
              />
              <ArrowWidth
                centreX={svgWidth / 2}
                centreY={svgHeight / 2}
                maxSize={maxSize}
                offset={offset}
                height={height}
                width={width}
              />
              <Area
                centreX={svgWidth / 2}
                centreY={svgHeight / 2}
                maxSize={maxSize}
                offset={offset}
                height={height}
                width={width}
              />
            </svg>
          </Flex>

          <Flex alignItems="center" justifyContent="center" mb={2}>
            <Input
              display="inline-block"
              type="number"
              width="auto"
              min={1}
              value={width}
              onChange={(event) => setWidth(event.target.value)}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="center" mb={2}>
            <Input
              display="inline-block"
              type="number"
              width="auto"
              min={1}
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </Flex>
        </Flex>
      </UIModeProvider>
    </ThemeProvider>
  );
}

function Area({ centreX, centreY, height, maxSize, offset, width }) {
  const ratio = width / height;

  const actualHeight = ratio > 1 ? (1 / ratio) * maxSize : maxSize;
  const actualWidth = ratio < 1 ? ratio * maxSize : maxSize;

  return (
    <g id="area">
      <g id="area-outer" fill="#fdc135" stroke="#000" strokeWidth="1">
        <motion.rect
          id="area-outer-fill"
          stroke="none"
          initial={false}
          animate={{
            x: centreX - actualWidth / 2,
            y: centreY - actualHeight / 2,
            width: actualWidth,
            height: actualHeight,
            transition: {
              type: "spring",
              stiffness: STIFFNESS,
              damping: DAMPING,
              restDelta: RESTDELTA,
              restSpeed: RESTSPEED
            }
          }}
          style={{
            width: actualWidth,
            height: actualHeight
          }}
        ></motion.rect>
        <motion.rect
          id="area-outer-stroke"
          fill="none"
          initial={false}
          animate={{
            x: centreX - actualWidth / 2,
            y: centreY - actualHeight / 2,
            width: actualWidth,
            height: actualHeight,
            transition: {
              type: "spring",
              stiffness: STIFFNESS,
              damping: DAMPING,
              restDelta: RESTDELTA,
              restSpeed: RESTSPEED
            }
          }}
          style={{
            width: actualWidth,
            height: actualHeight
          }}
        ></motion.rect>
      </g>
      <g id="area-inner" fill="#c7c7c7" stroke="#000" strokeWidth="1">
        <motion.rect
          id="area-inner-fill"
          stroke="none"
          initial={false}
          animate={{
            x: centreX - actualWidth / 2 + offset / 2,
            y: centreY - actualHeight / 2 + offset / 2,
            width: Math.max(actualWidth - offset, 0),
            height: Math.max(actualHeight - offset, 0),
            transition: {
              type: "spring",
              stiffness: STIFFNESS,
              damping: DAMPING,
              restDelta: RESTDELTA,
              restSpeed: RESTSPEED
            }
          }}
          style={{
            width: Math.max(actualWidth - offset, 0),
            height: Math.max(actualHeight - offset, 0)
          }}
        ></motion.rect>
        <motion.rect
          id="area-inner-stroke"
          fill="none"
          initial={false}
          animate={{
            x: centreX - actualWidth / 2 + offset / 2,
            y: centreY - actualHeight / 2 + offset / 2,
            width: Math.max(actualWidth - offset, 0),
            height: Math.max(actualHeight - offset, 0),
            transition: {
              type: "spring",
              stiffness: STIFFNESS,
              damping: DAMPING,
              restDelta: RESTDELTA,
              restSpeed: RESTSPEED
            }
          }}
          style={{
            width: Math.max(actualWidth - offset, 0),
            height: Math.max(actualHeight - offset, 0)
          }}
        ></motion.rect>
      </g>
    </g>
  );
}

function ArrowHeight({ centreX, centreY, height, maxSize, offset, width }) {
  const ratio = width / height;

  const actualHeight = ratio > 1 ? (1 / ratio) * maxSize : maxSize;
  const actualWidth = ratio < 1 ? ratio * maxSize : maxSize;

  return (
    <g id="height-arrow">
      <motion.line
        fill="none"
        stroke="#333"
        strokeWidth="1"
        y2={actualHeight}
        initial={false}
        animate={{
          x: centreX + actualWidth / 2 + offset,
          y: centreY - actualHeight / 2,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.path
        d="M5,0l5,9H0Z"
        fill="#333"
        initial={false}
        animate={{
          x: centreX + actualWidth / 2 + offset - 5,
          y: centreY - actualHeight / 2,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.path
        d="M5,0l5,9H0Z"
        fill="#333"
        initial={false}
        animate={{
          x: centreX + actualWidth / 2 + offset - 5,
          y: centreY + actualHeight / 2 - 9,
          rotate: 180,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.text
        id="height-label"
        fill="#333"
        fontFamily="Verdana"
        fontSize="15"
        dominantBaseline="middle"
        textAnchor="left"
        initial={false}
        animate={{
          x: centreX + actualWidth / 2 + offset * 2,
          y: centreY + 2,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      >
        <tspan>{height}m</tspan>
      </motion.text>
    </g>
  );
}

function ArrowWidth({ centreX, centreY, height, maxSize, offset, width }) {
  const ratio = width / height;

  const actualHeight = ratio > 1 ? (1 / ratio) * maxSize : maxSize;
  const actualWidth = ratio < 1 ? ratio * maxSize : maxSize;

  return (
    <g id="width-arrow">
      <motion.line
        x2={actualWidth}
        fill="none"
        stroke="#333"
        strokeWidth="1"
        initial={false}
        animate={{
          x: centreX - actualWidth / 2,
          y: centreY + actualHeight / 2 + offset,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.path
        d="M5,0l5,9H0Z"
        fill="#333"
        initial={false}
        animate={{
          x: centreX - actualWidth / 2,
          y: centreY + actualHeight / 2 + offset - 5,
          rotate: -90,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.path
        d="M5,0l5,9H0Z"
        fill="#333"
        initial={false}
        animate={{
          x: centreX + actualWidth / 2 - 9,
          y: centreY + actualHeight / 2 + offset - 5,
          rotate: 90,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      />
      <motion.text
        id="width-label"
        fill="#333"
        fontFamily="Verdana"
        fontSize="15"
        dominantBaseline="middle"
        textAnchor="middle"
        initial={false}
        animate={{
          x: centreX,
          y: centreY + actualHeight / 2 + offset * 3,
          transition: {
            type: "spring",
            stiffness: STIFFNESS,
            damping: DAMPING,
            restDelta: RESTDELTA,
            restSpeed: RESTSPEED
          }
        }}
      >
        <tspan>{width}m</tspan>
      </motion.text>
    </g>
  );
}

function Grass() {
  return (
    <g id="grass" transform="translate(-917 -341)">
      <rect
        width="252"
        height="226"
        transform="translate(917 341)"
        fill="#6f9d20"
      ></rect>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(740.303 -117.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(722.303 -77.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(938.303 -185.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(918.303 -218.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(935.303 -77.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(899.303 -57.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(724.303 -150.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(756.303 -193.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(722.303 -218.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(778.303 -218.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(766.303 -59.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(947.303 -240.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(756.303 -239.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(815.303 -240.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(884.303 -240.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(929.303 -34.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(731.303 -34.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(795.303 -34.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(782.303 -155.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(890.303 -159.475)"
        fill="none"
        stroke="#040405"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(809.303 -192.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(875.303 -192.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(847.303 -218.975)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(857.303 -34.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
      <path
        d="M203.7,590.942a1.317,1.317,0,0,1,.932-.71,2.645,2.645,0,0,1,1.2.059c.694.171,1.347.476,2.033.676a3.289,3.289,0,0,0,2.1.03c.983-.385,1.672-1.489,2.728-1.522"
        transform="translate(834.303 -57.475)"
        fill="none"
        stroke="#333"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1"
      ></path>
    </g>
  );
}
