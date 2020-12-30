import React from "react";
import { Table, Button, Image, Typography, Progress } from "antd";
import "./App.css";

const App = () => {
  // Default columns
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
            {/* Add new vendor */}
            <Image
              src="https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png"
              width={30}
              preview={false}
              onClick={addNewVendor}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={record.key > 0 ? () => addNewLeaf(record.key) : null}
        >
          {children}
          {/* Add delete button after overall score */}
          {record.key > 0 && (
            <Button
              shape="circle"
              danger
              onClick={(e) => deleteSelectedCriteria(e, record.key)}
            >
              X
            </Button>
          )}
        </div>
      ),
    },
    // Sample Vendor
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
    // Sample Vendor
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
    // Sample Vendor
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
  // Sample Criterial
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
      vendor: <Typography.Text>Criteria with Leaf, Onclick me</Typography.Text>,
      dropbox: <Typography.Text>Criteria 1</Typography.Text>,
      googledrive: <Typography.Text>Criteria 1</Typography.Text>,
      salesforce: <Typography.Text>Criteria 3</Typography.Text>,
      descriptions: ["This is a  leaf", "This is second a leaf"],
    },
  ];

  const [columns, setColumns] = React.useState(defaultColumns);
  const [dataSource, setDataSource] = React.useState(defaultDataSource);

  // This will render image with title and delete button on top right
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

  // Add new vendor function
  const addNewVendor = () => {
    // I will use columns inside setState function because of closure. However you can break it by set up to it a context api.
    setColumns((columns) => {
      // new Vendor object
      const newVendor = {
        index: columns[columns.length - 1].index + 1,
        title: () =>
          renderTitleImage({
            src:
              "https://cdn.pixabay.com/photo/2014/04/02/10/55/plus-304947_960_720.png",
            title: `New Vendor ${columns[columns.length - 1].index + 1}`,
            index: columns[columns.length - 1].index + 1,
          }),
        dataIndex: `newvendor${columns[columns.length - 1].index + 1}`,
        key: `newvendor${columns[columns.length - 1].index + 1}`,
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

  // delete selected vendor function
  const deleteSelectedVendor = (index) => {
    setColumns((columns) => columns.filter((column) => column.index !== index));
  };

  // add new criteria function
  const addNewCriteria = () => {
    // I put my explaination in addnewvendor function
    setDataSource((dataSource) => {
      //We need a base criteria
      const newCriteria = {
        key: dataSource[dataSource.length - 1].key + 1,
        descriptions: [],
      };

      // This loop will find the rest of vendor that had been created
      for (let index = 0; index < columns.length; index++) {
        const element = columns[index];
        if (index === 0) {
          // the first column
          newCriteria[element.key] = (
            <Typography.Text>Criteria name {dataSource.length}</Typography.Text>
          );
        } else {
          // The next vendors column
          newCriteria[element.key] = (
            <Typography.Text>Random {index + 1}</Typography.Text>
          );
        }
      }

      return [...dataSource, newCriteria];
    });
  };

  // deleteSelectedCriteria
  const deleteSelectedCriteria = (e, key) => {
    // I need to prevent it because I use onclick on the parent
    e.stopPropagation();
    // just filtered it out
    setDataSource((dataSource) =>
      dataSource.filter((item) => item.key !== key)
    );
  };

  // Add new leaf function
  const addNewLeaf = (key) => {
    setDataSource((dataSource) => {
      // we need to take the selected dataSource out and push new leaf
      const processedDataSource = dataSource.find((item) => item.key === key);

      processedDataSource.descriptions.push(
        `New data source${processedDataSource.descriptions.length}`
      );

      // Then filtered the current datasource and add the processed data source after it
      const filteredDataSource = dataSource.filter((item) => item.key !== key);

      // I sort it to prevent new data change
      const newDataSource = [...filteredDataSource, processedDataSource].sort(
        (a, b) => a.key - b.key
      );

      return newDataSource;
    });
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
        // So expandedRowRender is the render method for leaf, and row Expandable is the logic
        expandable={{
          expandedRowRender: (record) => {
            return record.descriptions.map((item) => (
              <p style={{ margin: 0 }} key={item}>
                {item}
              </p>
            ));
          },
          rowExpandable: (record) => record.descriptions?.length > 0,
        }}
      />
    </div>
  );
};

export default App;
