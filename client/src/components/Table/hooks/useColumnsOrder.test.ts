import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useColumnsOrder } from "./useColumnsOrder";

describe("useSorting hook", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should apply provided params", () => {
    const { result } = renderHook(() =>
      useColumnsOrder({
        id: "id",
        defaultOrder: ["key", "another-key"],
      })
    );

    expect(result.current.defaultOrder).toStrictEqual(["key", "another-key"]);
    expect(result.current.currentOrder).toStrictEqual(["key", "another-key"]);
  });

  it("should apply current order from Local Storage", () => {
    localStorage.setItem("id", JSON.stringify(["key"]));

    const { result } = renderHook(() =>
      useColumnsOrder({
        id: "id",
        defaultOrder: ["key", "another-key"],
      })
    );

    expect(result.current.defaultOrder).toStrictEqual(["key", "another-key"]);
    expect(result.current.currentOrder).toStrictEqual(["key"]);
  });

  it("should remove key from current order and add it to its initial place", () => {
    const { result } = renderHook(() =>
      useColumnsOrder({
        id: "id",
        defaultOrder: ["key1", "key2", "key3"],
      })
    );

    act(() => {
      result.current.removeColumn("key3");
    });

    expect(result.current.currentOrder).toStrictEqual(["key1", "key2"]);
    expect(localStorage.getItem("id")).toStrictEqual(
      JSON.stringify(["key1", "key2"])
    );

    act(() => {
      result.current.addColumn("key3");
    });

    expect(result.current.currentOrder).toStrictEqual(["key1", "key2", "key3"]);
  });
});
