import React, { FC, MouseEvent } from 'react'

type PaginationType = {
    currentPage: number
    limit: number
    count: number
    onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Pagination: FC<PaginationType> = ({
    currentPage,
    limit,
    count,
    onClick
}) => {
    const totalPages = Math.ceil(count / limit)
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, currentPage + 2)

    if(currentPage <= 3) {
        endPage = Math.min(5, totalPages)
    } else if(totalPages - 2 <= currentPage) {
        startPage = totalPages - 4
    }

    const pageNumbers = []
    for(let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex justify-center items-center -space-x-px h-8 text-sm">
            <button
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={onClick}
            >
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
            </button>
            {pageNumbers.map((item, index) => 
                <button
                    className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700${currentPage == item ? ' font-bold' : ''}`}
                    key={`pagination-${index}`}
                    onClick={onClick}
                >
                    {item}
                </button>
            )}
            <button
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                onClick={onClick}
            >
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </button>
        </div>
    )
}

export default Pagination