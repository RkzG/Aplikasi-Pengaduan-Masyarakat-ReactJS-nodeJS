import React from "react";

export default function DataTable(props) {
  const { className, column, data, meta, size } = props;

  return (
    <table className={"table table-hover " + className}>
      <thead className="thead-dark">
        <tr>
          {column.map((item, idx) => (
            <TableHeader item={item} key={idx} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => {
          item.order = idx;
          return (
            <TableRow
              column={column}
              idx={idx}
              item={item}
              key={idx}
              meta={meta}
              size={size}
            />
          );
        })}
      </tbody>
    </table>
  );
}

DataTable.defaultProps = {
  className: "",
  column: [],
  data: [],
  meta: {},
  size: 10,
};

export function TableHeader({ item }) {
  return <th className="text-capitalize">{item.heading}</th>;
}

export function TableRow({ column, item }) {
  return (
    <tr className="">
      {column.map((cItem, cIdx) => {
        const { value } = cItem;

        return (
          <td className="" key={cIdx}>
            {typeof value === "function" ? value(item) : item[value]}
          </td>
        );
      })}
    </tr>
  );
}

TableRow.defaultProps = {
  column: [],
  idx: 0,
  item: {},
  size: 10,
};
