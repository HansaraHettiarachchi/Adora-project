import { Breadcrumb, Container } from 'react-bootstrap'

export default function BreadcrumbBar() {
  return (
    <>
      <Container fluid className=' py-1' style={{ backgroundColor: "#238f39ff" }}>
        <Container fluid="sm" className='mt-2'>
          <Breadcrumb >
            <Breadcrumb.Item className='text-dark' href="#">Home</Breadcrumb.Item>
            <Breadcrumb.Item className='text-dark' href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
              Library
            </Breadcrumb.Item>
            <Breadcrumb.Item className='text-dark' active>Data</Breadcrumb.Item>
          </Breadcrumb>
        </Container>
      </Container>
    </>
  )
}
