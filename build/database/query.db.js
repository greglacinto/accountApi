"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameEnquiryQuery = exports.balanceEnquiryQuery = exports.accountEnquiryQuery = void 0;
exports.accountEnquiryQuery = `
select gam.acct_name, gam.cif_id, phone.PHONENUMBER, email.EMAILID 
FROM TBAADM.GAM gam, CIF.PHONEDETAIL phone, CIF.EMAILDETAIL email 
where gam.foracid = :id
and gam.cif_id = phone.cifid and gam.cif_id = email.cifid
`;
exports.balanceEnquiryQuery = `
SELECT CLR_BAL_AMT FROM TBAADM.GAM WHERE FORACID = :id AND ROWNUM=1
`;
exports.nameEnquiryQuery = `
SELECT ACCT_NAME FROM TBAADM.GAM WHERE FORACID = :id AND ROWNUM=1
`;
