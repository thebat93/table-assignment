import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should apply default params", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(5);
    expect(result.current.total).toBe(0);
    expect(result.current.isNextActive).toBe(false);
    expect(result.current.isPreviousActive).toBe(false);
  });

  it("should apply provided params", () => {
    const { result } = renderHook(() =>
      usePagination({
        defaultPageIndex: 1,
        defaultPageSize: 10,
        defaultTotal: 100,
      })
    );

    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(10);
    expect(result.current.total).toBe(100);
    expect(result.current.isNextActive).toBe(true);
    expect(result.current.isPreviousActive).toBe(true);
  });

  it("should add page if goNextPage is used", () => {
    const { result } = renderHook(() => usePagination({ defaultTotal: 100 }));

    act(() => {
      result.current.goNextPage();
    });

    expect(result.current.page).toBe(2);
    expect(result.current.isNextActive).toBe(true);
    expect(result.current.isPreviousActive).toBe(true);
  });

  it("should subtract page if goPreviousPage is used", () => {
    const { result } = renderHook(() =>
      usePagination({ defaultPageIndex: 1, defaultTotal: 100 })
    );

    act(() => {
      result.current.goPreviousPage();
    });

    expect(result.current.page).toBe(1);
    expect(result.current.isNextActive).toBe(true);
    expect(result.current.isPreviousActive).toBe(false);
  });

  it("should invoke onPageChange if page is changed", () => {
    const onPageChangeSpy = vi.fn();

    const { result } = renderHook(() =>
      usePagination({ onPageChange: onPageChangeSpy })
    );

    act(() => {
      result.current.setPage(5);
    });

    expect(onPageChangeSpy).toHaveBeenCalledWith(5)
  });

  it("should invoke onPageSizeChange if page size is changed", () => {
    const onPageSizeChangeSpy = vi.fn();

    const { result } = renderHook(() =>
      usePagination({ onPageSizeChange: onPageSizeChangeSpy })
    );

    act(() => {
      result.current.setPageSize(10);
    });

    expect(onPageSizeChangeSpy).toHaveBeenCalledWith(10)
  });
});
