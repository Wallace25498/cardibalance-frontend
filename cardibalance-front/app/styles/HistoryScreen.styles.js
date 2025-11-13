import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginTop: 20,
    marginBottom: 20
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 20
  },
  tab: {
    fontSize: 16,
    color: '#999',
    paddingBottom: 12,
    paddingHorizontal: 4,
    marginRight: 24
  },
  activeTab: {
    color: '#007AFF',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    fontWeight: '500'
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 24
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8
  },
  glucoseValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16
  },
  percentageText: {
    color: '#34C759',
    fontWeight: '500'
  },
  chartContainer: {
    marginTop: 12,
    alignItems: 'center'
  },
  chart: {
    borderRadius: 8
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16
  },
  readingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  readingInfo: {
    flex: 1
  },
  readingDate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4
  },
  readingValue: {
    fontSize: 14,
    color: '#666'
  },
  readingTime: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500'
  },
  bottomSpacer: {
    height: 100
  }
})

export default styles
