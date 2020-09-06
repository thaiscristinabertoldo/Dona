import React, { memo, useState } from 'react'

import { Navbar } from 'components/Navbar'

import Sidebar from 'components/Sidebar/Sidebar'
import Content from 'components/Content/Content'

const AdminLayout = memo(({ children, routes }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <Navbar onClickMenu={setOpenSidebar} />
      <Sidebar open={openSidebar} onOpen={setOpenSidebar} routes={routes} />
      <Content>{children}</Content>
    </>
  )
})

export default AdminLayout
