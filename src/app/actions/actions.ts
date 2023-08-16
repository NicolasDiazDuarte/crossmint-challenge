import { SetStateAction } from "react";

const candidateId = "7bfc488e-2f0a-46b0-b0ed-5482f4d9b0a4";

export async function fetchMapData() {
  try {
    const response = await fetch(
      `https://challenge.crossmint.io/api/map/${candidateId}/goal`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const handleCreatePolyanet = async (
  selectedRow: number,
  selectedColumn: number
) => {
  const response = await fetch("https://challenge.crossmint.io/api/polyanets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidateId,
      row: selectedRow,
      column: selectedColumn,
    }),
  });

  if (response.ok) {
    return response;
  } else {
    console.error("Error creating Polyanet");
  }
};

export const handleCreateSoloon = async (
  selectedRow: number,
  selectedColumn: number,
  color: string
) => {
  const response = await fetch("https://challenge.crossmint.io/api/soloons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidateId,
      row: selectedRow,
      column: selectedColumn,
      color: color,
    }),
  });

  if (response.ok) {
    return response;
  } else {
    console.error("Error creating Soloon");
  }
};

export const handleCreateCometh = async (
  selectedRow: number,
  selectedColumn: number,
  direction: string
) => {
  const response = await fetch("https://challenge.crossmint.io/api/comeths", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidateId,
      row: selectedRow,
      column: selectedColumn,
      direction: direction,
    }),
  });

  if (response.ok) {
    return response;
  } else {
    console.error("Error creating Cometh");
  }
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
export const createMap = async (
  mapArray: MapArray,
  setMessage: { (value: SetStateAction<string>): void; (arg0: string): void }
) => {
  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const rows = mapArray.length;
  const columns = mapArray[0].length;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const object = mapArray[row][column];

      if (object === "SPACE") {
        // No action needed for "SPACE"
      } else if (object === "POLYANET") {
        setMessage("Creating a POLYANET");
        await handleCreatePolyanet(row, column);
      } else if (
        object === "BLUE_SOLOON" ||
        object === "RED_SOLOON" ||
        object === "PURPLE_SOLOON" ||
        object === "WHITE_SOLOON"
      ) {
        const color = object.split("_")[0].toLowerCase();
        setMessage(`Creating a ${color} SOLOON`);
        await handleCreateSoloon(row, column, color);
      } else if (object.includes("_COMETH")) {
        const direction = object.split("_")[0].toLowerCase();
        setMessage(`Creating a ${direction} COMETH`);
        await handleCreateCometh(row, column, direction);
      } else {
        console.error("Unknown object type:", object);
      }

      if (object !== "SPACE") {
        await delay(3000);
      }
    }
  }
};
