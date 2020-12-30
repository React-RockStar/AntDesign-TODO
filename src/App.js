import React from "react";
import { Table, Button, Image, Typography, Progress } from "antd";
import "./App.css";

const App = () => {
  const defaultColumns = [
    {
      index: 0,
      title: () => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Image
              src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png"
              width={30}
              preview={false}
            />
            <Button type="link" onClick={addNewVendor}>
              Add new Vendor
            </Button>
          </div>
        );
      },
      dataIndex: "vendor",
      key: "vendor",
      render: (children, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {children}
          {record.key > 0 && (
            <Button
              shape="circle"
              danger
              onClick={() => deleteSelectedCriteria(record.key)}
            >
              X
            </Button>
          )}
        </div>
      ),
    },
    {
      index: 1,
      title: () =>
        renderTitleImage({
          src:
            "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png",
          title: "Dropbox",
          index: 1,
        }),
      dataIndex: "dropbox",
      key: "dropbox",
      render: (children) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      ),
    },
    {
      index: 2,
      title: () =>
        renderTitleImage({
          src:
            "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png",
          title: "Google Drive",
          index: 2,
        }),
      dataIndex: "googledrive",
      key: "googledrive",
      render: (children) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      ),
    },
    {
      index: 3,
      title: () =>
        renderTitleImage({
          src:
            "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png",
          title: "SalesForce",
          index: 3,
        }),
      dataIndex: "salesforce",
      key: "salesforce",
      render: (children) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </div>
      ),
    },
  ];

  const defaultDataSource = [
    {
      key: 0,
      vendor: <Typography.Text>Overall Score</Typography.Text>,
      dropbox: <Progress type="circle" percent={60} width={60} />,
      googledrive: <Progress type="circle" percent={45} width={60} />,
      salesforce: <Progress type="circle" percent={62} width={60} />,
    },
    {
      key: 1,
      vendor: <Typography.Text>Criteria with Leaf</Typography.Text>,
      dropbox: <Typography.Text>Criteria 1</Typography.Text>,
      googledrive: <Typography.Text>Criteria 1</Typography.Text>,
      salesforce: <Typography.Text>Criteria 3</Typography.Text>,
      description: "This is a description leaf",
    },
  ];

  const [columns, setColumns] = React.useState(defaultColumns);
  const [dataSource, setDataSource] = React.useState(defaultDataSource);

  const renderTitleImage = ({ src, title, index }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image src={src} width={30} preview={false} />
      <Typography>{title}</Typography>
      <Button
        style={{ position: "absolute", top: 0, right: 0 }}
        type="text"
        onClick={() => deleteSelectedVendor(index)}
      >
        X
      </Button>
    </div>
  );

  const addNewVendor = () => {
    setColumns((columns) => {
      const newVendor = {
        index: columns.length,
        title: () =>
          renderTitleImage({
            src:
              "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png",
            title: `New Vendor ${columns.length}`,
            index: columns.length,
          }),
        dataIndex: `newvendor${columns.length}`,
        key: `newvendor${columns.length}`,
        render: (children) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        ),
      };
      return [...columns, newVendor];
    });
  };

  const deleteSelectedVendor = (index) => {
    console.log("vendor", columns);
    console.log(index);

    setColumns((columns) => columns.filter((column) => column.index !== index));
  };

  const addNewCriteria = () => {
    setDataSource((dataSource) => {
      const newCriteria = {
        key: dataSource[dataSource.length - 1].key + 1,
      };

      for (let index = 0; index < columns.length; index++) {
        const element = columns[index];
        if (index === 0) {
          newCriteria[element.key] = (
            <Typography.Text>Criteria name {dataSource.length}</Typography.Text>
          );
        } else {
          newCriteria[element.key] = (
            <Typography.Text>Random {index + 1}</Typography.Text>
          );
        }

        console.log(newCriteria);
      }

      return [...dataSource, newCriteria];
    });
  };

  const deleteSelectedCriteria = (key) => {
    setDataSource((dataSource) =>
      dataSource.filter((item) => item.key !== key)
    );
  };

  return (
    <div>
      <Button type="text" onClick={addNewCriteria}>
        Add criteria
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            console.log(record);
            return <p style={{ margin: 0 }}>{record.description}</p>;
          },
          rowExpandable: (record) => record.description,
        }}
      />
    </div>
  );
};

export default App;
