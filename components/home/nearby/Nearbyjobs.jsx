import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '../../../constants';
import styles from './nearbyjobs.style';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/useFetch';




const Nearbyjobs = () => {
  const router = useRouter();
  
  const { data, isLoading, error } = useFetch('search', {
      query: 'React Developer',
      num_pages: 1
    });


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View>
        {
        isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary}/>
        ) : error ? (
          <Text>something went wrong</Text>
        ) : (
          data?.map((job) =>(
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={ () => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs;