import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSelection } from "./useSelection";

describe("useSelection hook", () => {
  it("should add and remove selected ID to the list", () => {
    const ids = ["id1", "id2"];
    const { result } = renderHook(() => useSelection(ids));

    expect(result.current.selectedIds.size).toBe(0);

    act(() => {
      result.current.onChangeSelection("id1");
    });

    expect(result.current.selectedIds.has("id1")).toBe(true);

    act(() => {
      result.current.onChangeSelection("id1");
    });

    expect(result.current.selectedIds.has("id1")).toBe(false);
  });

  it("should select and unselect all IDs", () => {
    const ids = ["id1", "id2"];
    const { result } = renderHook(() => useSelection(ids));

    expect(result.current.selectedIds.size).toBe(0);

    act(() => {
      result.current.onChangeSelectionAll();
    });

    expect(result.current.selectedIds.size).toBe(2);

    act(() => {
      result.current.onChangeSelectionAll();
    });

    expect(result.current.selectedIds.size).toBe(0);
  });

  it("should select all IDs if the selected list in not empty", () => {
    const ids = ["id1", "id2"];
    const { result } = renderHook(() => useSelection(ids));

    expect(result.current.selectedIds.size).toBe(0);

    act(() => {
      result.current.setSelectedIds(new Set(["id1"]));
    });

    expect(result.current.selectedIds.size).toBe(1);

    act(() => {
      result.current.onChangeSelectionAll();
    });

    expect(result.current.selectedIds.size).toBe(2);
  });
});
