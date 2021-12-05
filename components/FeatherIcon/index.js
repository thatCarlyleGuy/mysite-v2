import {
  Activity,
  CheckCircle,
  DownloadCloud,
  GitHub,
  Linkedin,
} from 'react-feather';

const FeatherIcon = ({ name = '', className }) => {
  const normalizedName = name.toLowerCase();
  if (normalizedName === 'check') {
    return <CheckCircle className={className} />;
  }
  if (normalizedName === 'download') {
    return <DownloadCloud className={className} />;
  }
  if (normalizedName === 'activity') {
    return <Activity className={className} />;
  }
  if (normalizedName === 'github') {
    return <GitHub className={className} />;
  }
  if (normalizedName === 'linkedin') {
    return <Linkedin className={className} />;
  }
  return '';
};

export default FeatherIcon;
