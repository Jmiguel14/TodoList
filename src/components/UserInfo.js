import React from "react";
import {Descriptions} from "antd";

const UserInfo = ({users}) => (
    <>
        <Descriptions title="Información del Usuario" bordered>
            <Descriptions.Item label="Nombre: ">{users.name}</Descriptions.Item>
            <Descriptions.Item label="Usurio">{users.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{users.email}</Descriptions.Item>
            <Descriptions.Item label="Sitio Web">{users.website}</Descriptions.Item>
            <Descriptions.Item label="Teléfono">{users.phone}</Descriptions.Item>
        </Descriptions>
    </>
)



export default UserInfo;