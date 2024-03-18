import React, { useEffect, useMemo, useState } from "react";
import ListingComponents from "../../Components/Shared/ListingComponents/ListingComponents";
import PageHeader from "../../Components/Shared/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { convertToModuleName } from "../../commonjs/commonHelpers";
import { useRouter } from "next/router";
import { tokens } from "../../commonjs/common";
import QueryUtilityFunc from "../../Components/Shared/QueryUtilityFunc/QueryUtilityFunc";
import { getHomeDeliveryListing } from "../../redux/actions/homeDeliveryAction";
import ReportCard from "../../Components/Shared/Reports/ReportCard";
import { reportExampleJson } from "../../commonJSON/reportExampleJson";
import ListingSearch from "../../Components/Shared/ListingSearch/ListingSearch";

const Reports = () => {
  return (
    <div className="page-content">
      <PageHeader />
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body pt-2 p-4">
              <div className="row d-flex border-1  mt-3">
                {reportExampleJson.map((chunk, index) => {
                  return (
                    <ReportCard
                      key={index}
                      items={chunk}
                      indexWrapper={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
