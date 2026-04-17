import { useParams, Navigate } from "react-router-dom";
import { LoanGuideTemplate } from "@/components/templates/LoanGuideTemplate";
import { LOAN_CONTENT } from "@/data/loan-content";

const LoanGuidePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? LOAN_CONTENT[slug] : undefined;
  if (!content) return <Navigate to="/loans/va" replace />;
  return <LoanGuideTemplate content={content} />;
};

export default LoanGuidePage;
