import { useMemo, useCallback } from 'react';
import { Box, Stack, Text } from "@chakra-ui/react";

import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters?: number
  registerPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const generatePagesArray = useCallback((from: number, to:number) => {
    return [...new Array(to - from)]
      .map((_, index) => (from + index + 1))
      .filter(page => page > 0)
  }, [])

  const lastPage = useMemo(() => {
    console.log(totalCountOfRegisters)
    return Math.floor(totalCountOfRegisters / registerPerPage)
  }, [totalCountOfRegisters, registerPerPage])

  const previousPages = useMemo(() => {
    return currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []
  }, [currentPage, generatePagesArray])

  const nextPages = useMemo(() => {
    return currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []
  }, [currentPage, lastPage, generatePagesArray])

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            { currentPage > (2 + siblingsCount) && (
              <Text color="gray.300"  textAlign="center">...</Text>
            )}
          </>
        )}

        { previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        { nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        {(currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300"  textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
