import React from 'react'
import {Container, Menu} from 'semantic-ui-react'

const Header = () => (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          Date Book &#8212; React Example Site
        </Menu.Item>
        <Menu.Item as='a'>Home</Menu.Item>
      </Container>
    </Menu>
)

export default Header
