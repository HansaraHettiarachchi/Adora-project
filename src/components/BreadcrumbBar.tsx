import { Breadcrumb, Container } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IoHomeOutline } from "react-icons/io5";

 
export default function BreadcrumbBar({ currentPage = "" }) {
  return (
    <>
      <Container fluid className=' py-1' style={{ backgroundColor: "#238f39ff" }}>
        <Container
        fluid="sm"
        className="d-flex align-items-center"
        style={{ gap: "8px" }}
      >
        {/* Home Icon */}
        <IoHomeOutline size={22} color="#000" style={{ cursor: "pointer" }} />

        {/* Separator */}
        <BsChevronDoubleRight size={18} color="#000" />

        {/* Current Page Text */}
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#000"
          }}
        >
          {currentPage}
        </span>
      </Container>
      </Container>
    </>
  )
}
