"use client";
import React, { useEffect, useState } from "react";
import { createMap } from "../actions/actions";

const fetchMapData = async () => {
  const response = await fetch(
    `https://challenge.crossmint.io/api/map/7bfc488e-2f0a-46b0-b0ed-5482f4d9b0a4/goal`
  );
  const data = await response.json();
  return data;
};

type MapObject =
  | "SPACE"
  | "POLYANET"
  | "BLUE_SOLOON"
  | "RED_SOLOON"
  | "PURPLE_SOLOON"
  | "WHITE_SOLOON"
  | "UP_COMETH"
  | "DOWN_COMETH"
  | "RIGHT_COMETH"
  | "LEFT_COMETH";

type MapArray = MapObject[][];

const MapPage = () => {
  const [goalMap, setGoalMap] = useState<MapArray>([]);
  const [message, setMessage] = useState("Creating Map...");
  const [showSuccesfulMsg, setShowSuccesfulMsg] = useState(false);

  useEffect(() => {
    fetchMapData().then((res) => {
      setGoalMap(res.goal);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <div className="flex flex-row gap-10">
          <div className="flex flex-col ">
            <h1 className="text-xl font-bold tracking-widest flex justify-center ">
              Goal Map:
            </h1>
            <div className="grid grid-cols-1 ">
              {goalMap &&
                goalMap.map(
                  (row: any[], rowIndex: React.Key | null | undefined) => (
                    <div key={rowIndex} className="flex">
                      {row.map(
                        (
                          cell: string | string[],
                          columnIndex: React.Key | null | undefined
                        ) => (
                          <div
                            key={columnIndex}
                            className={`w-8 h-6 border border-gray-300 flex items-center justify-center ${
                              cell.includes("POLYANET")
                                ? "bg-yellow-500 text-white"
                                : cell.includes("SOLOON")
                                ? "bg-green-500 text-white"
                                : cell.includes("COMETH")
                                ? "bg-red-500 text-white"
                                : ""
                            }`}
                          >
                            {cell.includes("POLYANET") ? "P" : ""}
                            {cell.includes("SOLOON") ? "S" : ""}
                            {cell.includes("COMETH") ? "C" : ""}
                          </div>
                        )
                      )}
                    </div>
                  )
                )}
            </div>
            <button
              onClick={() => {
                setShowSuccesfulMsg(true);
                createMap(goalMap, setMessage).then(() =>
                  setShowSuccesfulMsg(false)
                );
              }}
              className="m-auto bg-blue-500 text-white px-6 py-2 rounded mt-4"
            >
              Crear Polyanet
            </button>
            {showSuccesfulMsg && (
              <span className="m-auto text-green-500 text-2xl animate-pulse mt-2">
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
