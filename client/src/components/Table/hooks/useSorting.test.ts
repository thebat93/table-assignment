import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSorting } from "./useSorting";
import { SORT_DIRECTIONS } from "../const";

describe("useSorting hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should apply default params", () => {
    const { result } = renderHook(() => useSorting());

    expect(result.current.sortBy).toBe(undefined);
    expect(result.current.sortDirection).toBe(SORT_DIRECTIONS.ASC);
  });

  it("should apply provided params", () => {
    const { result } = renderHook(() =>
      useSorting({
        defaultSortBy: "key",
        defaultSortDirection: SORT_DIRECTIONS.DESC,
      })
    );

    expect(result.current.sortBy).toBe("key");
    expect(result.current.sortDirection).toBe(SORT_DIRECTIONS.DESC);
  });

  it("should toggle sorting direction", () => {
    const { result } = renderHook(() => useSorting());

    expect(result.current.sortDirection).toBe(SORT_DIRECTIONS.ASC);

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortDirection).toBe(SORT_DIRECTIONS.DESC);

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(result.current.sortDirection).toBe(SORT_DIRECTIONS.ASC);
  });

  it("should set sorting key", () => {
    const { result } = renderHook(() => useSorting());

    expect(result.current.sortBy).toBe(undefined);

    act(() => {
      result.current.setSortBy("key");
    });

    expect(result.current.sortBy).toBe("key");
  });

  it("should invoke onSortChange if sort key or direction is changed", () => {
    const onSortChangeSpy = vi.fn();

    const { result } = renderHook(() =>
      useSorting<"key" | "another-key">({
        onSortChange: onSortChangeSpy,
        defaultSortBy: "key",
      })
    );

    act(() => {
      result.current.setSortBy("another-key");
    });

    expect(onSortChangeSpy).toHaveBeenCalledWith({
      sortBy: "another-key",
      sortDirection: SORT_DIRECTIONS.ASC,
    });

    act(() => {
      result.current.toggleSortDirection();
    });

    expect(onSortChangeSpy).toHaveBeenCalledWith({
      sortBy: "another-key",
      sortDirection: SORT_DIRECTIONS.DESC,
    });
  });
});
