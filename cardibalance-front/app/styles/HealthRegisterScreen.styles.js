// styles.ts
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  backButton: {
    padding: 4
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  headerSpacer: {
    width: 32
  },
  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
  },
  expandedSection: {
    paddingVertical: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#000',
    marginBottom: 12
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionButtonSelected: {
    backgroundColor: '#007AFF'
  },
  optionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF'
  },
  optionButtonTextSelected: {
    color: '#fff'
  },
  timeRow: {
    flexDirection: 'row',
    gap: 12
  },
  timeInput: {
    flex: 1
  },
  referenceSection: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  referenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12
  },
  referenceText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
})
