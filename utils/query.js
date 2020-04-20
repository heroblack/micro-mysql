function buildJoin(table, join) {
  let sql = "";
  let joinQuery = "";
  let isTableObject = typeof table === "object";
  let tablePivote = "";
  let valuePivote = "";

  if (isTableObject) {
    tablePivote = Object.keys(table);
    valuePivote = table[tablePivote];
  } else {
    tablePivote = table;
  }
  if (join) {
    let tableJoin = Object.keys(join);
    let valueJoin = join[tableJoin];
    joinQuery = `JOIN ${tableJoin} ON ${tablePivote}.${valuePivote} = ${tableJoin}.${valueJoin}`;
  }

  sql = `SELECT * FROM ${tablePivote} ${joinQuery} where ${tablePivote}.?`;

  return sql;
}

module.exports = buildJoin;
